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
package com.agiletec.plugins.jpactionlogger.aps.system.services.actionlogger;

import java.util.List;

import com.agiletec.plugins.jpactionlogger.aps.ApsPluginBaseTestCase;
import com.agiletec.plugins.jpactionlogger.util.JpactionloggerTestHelper;

import com.agiletec.aps.util.DateConverter;
import com.agiletec.plugins.jpactionlogger.aps.system.JpactionloggerSystemConstants;
import com.agiletec.plugins.jpactionlogger.aps.system.services.actionlogger.IActionLoggerManager;
import com.agiletec.plugins.jpactionlogger.aps.system.services.actionlogger.model.ActionRecord;
import com.agiletec.plugins.jpactionlogger.aps.system.services.actionlogger.model.ActionRecordSearchBean;

public class TestActionLoggerManager extends ApsPluginBaseTestCase {
	
	@Override
	protected void setUp() throws Exception {
		super.setUp();
		this.init();
		this._helper.cleanRecords();
	}
		
	public void testGetActionRecords() throws Throwable {
		List<Integer> ids = this._actionLoggerManager.getActionRecords(null);
		this.compareIds(new Integer [] {}, ids);
		
		ActionRecord record1 = this._helper.createActionRecord(1, "username1", "actionName1", 
				"namespace1", DateConverter.parseDate("01/01/2009 00:00", "dd/MM/yyyy HH:mm"), "params1");
		ActionRecord record2 = this._helper.createActionRecord(2, "username2", "actionName2", 
				"namespace2", DateConverter.parseDate("01/01/2009 10:00", "dd/MM/yyyy HH:mm"), "params2");
		ActionRecord record3 = this._helper.createActionRecord(3, "username123", "actionName123", 
				"namespace123", DateConverter.parseDate("02/01/2009 12:00", "dd/MM/yyyy HH:mm"), "params123");
		this._helper.addActionRecord(record1);
		this._helper.addActionRecord(record2);
		this._helper.addActionRecord(record3);
		
		ids = this._actionLoggerManager.getActionRecords(null);
		this.compareIds(new Integer [] { 1, 2, 3 }, ids);
		
		ActionRecordSearchBean searchBean = this._helper.createSearchBean("name", "Name", "space", "arams", null, null);
		ids = this._actionLoggerManager.getActionRecords(searchBean);
		this.compareIds(new Integer [] { 1, 2, 3 }, ids);
		
		searchBean = this._helper.createSearchBean("name", "Name", "space", "arams", DateConverter.parseDate("01/01/2009 10:01", "dd/MM/yyyy HH:mm"), null);
		ids = this._actionLoggerManager.getActionRecords(searchBean);
		this.compareIds(new Integer [] { 3 }, ids);
		
		searchBean = this._helper.createSearchBean(null, null, null, null, null, DateConverter.parseDate("01/01/2009 10:01", "dd/MM/yyyy HH:mm"));
		ids = this._actionLoggerManager.getActionRecords(searchBean);
		this.compareIds(new Integer [] { 1, 2 }, ids);
		
		searchBean = this._helper.createSearchBean(null, "Name", null, null, DateConverter.parseDate("01/01/2009 09:01", "dd/MM/yyyy HH:mm"), 
				DateConverter.parseDate("01/01/2009 10:01", "dd/MM/yyyy HH:mm"));
		ids = this._actionLoggerManager.getActionRecords(searchBean);
		this.compareIds(new Integer [] { 2 }, ids);
		
		searchBean = this._helper.createSearchBean("name 1 2 3", "Name 1 2 3", "space 1 2 3", "arams 1 2 3", DateConverter.parseDate("01/01/2009 00:00", "dd/MM/yyyy HH:mm"), 
				DateConverter.parseDate("02/01/2009 12:00", "dd/MM/yyyy HH:mm"));
		ids = this._actionLoggerManager.getActionRecords(searchBean);
		this.compareIds(new Integer [] { 3 }, ids);
	}
	
	public void testAddGetDeleteActionRecord() throws Throwable {
		ActionRecord record1 = this._helper.createActionRecord(0, "username1", "actionName1", "namespace1", null, "params1");
		ActionRecord record2 = this._helper.createActionRecord(0, "username2", "actionName2", "namespace2", null, "params2");
		
		this._actionLoggerManager.addActionRecord(record1);
		this._actionLoggerManager.addActionRecord(record2);
		ActionRecord addedRecord1 = this._actionLoggerManager.getActionRecord(record1.getId());
		this.compareActionRecords(record1, addedRecord1);
		ActionRecord addedRecord2 = this._actionLoggerManager.getActionRecord(record2.getId());
		this.compareActionRecords(record2, addedRecord2);
		
		this._actionLoggerManager.deleteActionRecord(record1.getId());
		assertNull(this._actionLoggerManager.getActionRecord(record1.getId()));
		
		this._actionLoggerManager.deleteActionRecord(record2.getId());
		assertNull(this._actionLoggerManager.getActionRecord(record2.getId()));
	}
	
	private void compareIds(Integer[] expected, List<Integer> received) {
		assertEquals(expected.length, received.size());
		for (Integer id : expected) {
			if (!received.contains(id)) {
				fail("Id \"" + id + "\" not found");
			}
		}
	}
	
	private void compareActionRecords(ActionRecord expected, ActionRecord received) {
		assertEquals(expected.getId(), received.getId());
		assertEquals(expected.getUsername(), received.getUsername());
		assertEquals(expected.getActionName(), received.getActionName());
		assertEquals(expected.getNamespace(), received.getNamespace());
		assertEquals(expected.getParams(), received.getParams());
		assertEquals(DateConverter.getFormattedDate(expected.getActionDate(), "ddMMyyyyHHmm"), 
				DateConverter.getFormattedDate(received.getActionDate(), "ddMMyyyyHHmm"));
	}
	
	private void init() {
		this._actionLoggerManager = (IActionLoggerManager) this.getService(JpactionloggerSystemConstants.ACTION_LOGGER_MANAGER);
		this._helper = new JpactionloggerTestHelper(this.getApplicationContext());
	}
	
	@Override
	protected void tearDown() throws Exception {
		this._helper.cleanRecords();
		super.tearDown();
	}
	
	private IActionLoggerManager _actionLoggerManager;
	private JpactionloggerTestHelper _helper;
}