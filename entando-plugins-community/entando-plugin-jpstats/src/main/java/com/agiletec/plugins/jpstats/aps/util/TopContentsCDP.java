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
package com.agiletec.plugins.jpstats.aps.util;

import java.util.HashMap;
import java.util.Map;

import com.agiletec.aps.system.exception.ApsSystemException;
import com.agiletec.plugins.jpstats.aps.system.services.stats.IStatsManager;

/**
 * Class that provides the data to render the TopContents Chart 
 */
public class TopContentsCDP extends AbstractCategoryDataProducer {
	
	/**
	 * @param manager The StatsManager
	 * @param bean IStatsDataBean object that holds the date interval to render
	 */
	public TopContentsCDP(IStatsManager manager, IStatsDataBean bean) {
		super(manager, bean);
	}
	
	protected Map<String, Integer> getResultset() throws ApsSystemException {
		Map<String, Integer> result = new HashMap<String, Integer>();
		IStatsDataBean bean = super.getDataBean();
		result = super.getStatsManager().getTopContents(bean.getStart(), bean.getEnd());
		return result;
	}
	
}
