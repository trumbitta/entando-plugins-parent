/*
*
* Copyright 2005 AgileTec s.r.l. (http://www.agiletec.it) All rights reserved.
*
* This file is part of jAPS software.
* jAPS is a free software;
* you can redistribute it and/or modify it
* under the terms of the GNU General Public License (GPL) as published by the Free Software Foundation; version 2.
*
* See the file License for the specific language governing permissions
* and limitations under the License
*
*
*
* Copyright 2005 AgileTec s.r.l. (http://www.agiletec.it) All rights reserved.
*
*/
package com.agiletec.plugins.jpcontentfeedback.aps.system.services.contentfeedback.comment;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;

import com.agiletec.aps.system.ApsSystemUtils;
import com.agiletec.aps.system.common.AbstractService;
import com.agiletec.aps.system.exception.ApsSystemException;
import com.agiletec.aps.system.services.keygenerator.IKeyGeneratorManager;
import com.agiletec.plugins.jacms.aps.system.services.content.model.Content;
import com.agiletec.plugins.jpcontentfeedback.aps.system.services.contentfeedback.comment.model.Comment;
import com.agiletec.plugins.jpcontentfeedback.aps.system.services.contentfeedback.comment.model.CommentSearchBean;
import com.agiletec.plugins.jpcontentfeedback.aps.system.services.contentfeedback.comment.model.ICommentSearchBean;

@Aspect
public class CommentManager extends AbstractService implements ICommentManager {

	@Override
	public void init() throws Exception {
		ApsSystemUtils.getLogger().config(this.getName() + ": initialized");
	}


	@Override
	public void addComment(Comment comment) throws ApsSystemException {
		try {
			int key = this.getKeyGeneratorManager().getUniqueKeyCurrentValue();
			comment.setId(key);
			comment.setCreationDate(new Date());
			this.getCommentDAO().addComment(comment);
		} catch (Throwable t) {
			ApsSystemUtils.logThrowable(t, this, "addComment");
			throw new ApsSystemException("Error add comment", t);
		}

	}

	@AfterReturning(
			pointcut="execution(* com.agiletec.plugins.jacms.aps.system.services.content.IContentManager.deleteContent(..)) && args(content)")
	private void deleteAllComments(Content content) throws ApsSystemException{
		try {
			String contentId = content.getId();
			CommentSearchBean searcherBean = new CommentSearchBean();
			searcherBean.setContentId(contentId);
			List<String> ids = this.searchCommentIds(searcherBean);
			for (int i = 0; i< ids.size();i++){
				this.deleteComment(Integer.parseInt(ids.get(i)));
			}
		} catch (Throwable t) {
			ApsSystemUtils.logThrowable(t, this, "deleteAllComments");
			throw new ApsSystemException("Error while remove all comment", t);
		}
	}

	@Override
	public void deleteComment(int id) throws ApsSystemException {
		try {
			this.getCommentDAO().deleteComment(id);
		} catch (Throwable t) {
			ApsSystemUtils.logThrowable(t, this, "deleteComment");
			throw new ApsSystemException("Error while remove comment", t);
		}

	}

	@Override
	public Comment getComment(int id) throws ApsSystemException {
		Comment comment = null;
		try {
			comment = (Comment) this.getCommentDAO().getComment(id);
		} catch (Throwable t) {
			ApsSystemUtils.logThrowable(t, this, "getComment");
			throw new ApsSystemException("Error while extract comment", t);
		}
		return comment;
	}

	@Override
	public List<String> searchCommentIds(ICommentSearchBean searchBean) throws ApsSystemException {
		List<String> commentIds = new ArrayList<String>();
		try {
			commentIds = this.getCommentDAO().searchCommentsId(searchBean);
		} catch (Throwable t) {
			ApsSystemUtils.logThrowable(t, this, "searchCommentIds");
			throw new ApsSystemException("Error while search comment", t);
		}
		return commentIds;
	}


	@Override
	public void updateCommentStatus(int id, int status) throws ApsSystemException {
		try {
			this.getCommentDAO().updateStatus(id, status);
		} catch (Throwable t) {
			ApsSystemUtils.logThrowable(t, this, "updateCommentStatus");
			throw new ApsSystemException("Error while update comment status", t);
		}
	}

	public void setCommentDAO(ICommentDAO commentDAO) {
		this._commentDAO = commentDAO;
	}

	public ICommentDAO getCommentDAO() {
		return _commentDAO;
	}


	public void setKeyGeneratorManager(IKeyGeneratorManager keyGeneratorManager) {
		this._keyGeneratorManager = keyGeneratorManager;
	}

	public IKeyGeneratorManager getKeyGeneratorManager() {
		return _keyGeneratorManager;
	}


	private ICommentDAO _commentDAO;
	private IKeyGeneratorManager _keyGeneratorManager;
}
